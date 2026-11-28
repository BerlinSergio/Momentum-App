import UIKit
import Capacitor
import AlarmKit
import SwiftUI

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = MomentumViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}


class MomentumViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(MomentumIOSAlarmPlugin())
    }
}

@available(iOS 26.0, *)
struct MomentumAlarmMetadata: AlarmMetadata {
    var occurrence: String
}

@objc(MomentumIOSAlarmPlugin)
public class MomentumIOSAlarmPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MomentumIOSAlarmPlugin"
    public let jsName = "MomentumIOSAlarm"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "permission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "sync", returnType: CAPPluginReturnPromise)
    ]
    @objc func permission(_ call: CAPPluginCall) {
        guard #available(iOS 26.0, *) else { call.resolve(["status":"unavailable"]); return }
        Task { @MainActor in
            call.resolve(["status": self.status(AlarmManager.shared.authorizationState)])
        }
    }
    @available(iOS 26.0, *)
    private func status(_ value: AlarmManager.AuthorizationState) -> String {
        switch value {
        case .authorized: return "granted"
        case .denied: return "denied"
        case .notDetermined: return "prompt"
        @unknown default: return "unavailable"
        }
    }
    @objc func requestPermission(_ call: CAPPluginCall) {
        guard #available(iOS 26.0, *) else { call.resolve(["status":"unavailable"]); return }
        Task { @MainActor in
            do { call.resolve(["status": self.status(try await AlarmManager.shared.requestAuthorization())]) }
            catch { call.resolve(["status":"denied"]) }
        }
    }
    @objc func sync(_ call: CAPPluginCall) {
        guard #available(iOS 26.0, *) else { call.resolve(["covered":[] as [String],"status":"unavailable"]); return }
        let requested = call.getArray("alarms", JSObject.self) ?? []
        Task { @MainActor in
            let manager = AlarmManager.shared
            guard manager.authorizationState == .authorized else {
                call.resolve(["covered":[] as [String],"status":self.status(manager.authorizationState)]); return
            }
            let now = Date().timeIntervalSince1970 * 1000
            var desired: [String: JSObject] = [:]
            for item in requested.prefix(120) {
                guard let key = item["key"] as? String, !key.isEmpty, key.count <= 300,
                      let at = item["at"] as? Double, at.isFinite else { continue }
                desired[key] = item
            }
            let defaults = UserDefaults.standard
            let storageKey = "momentum.ios.alarm.ids.v1"
            var stored = defaults.dictionary(forKey: storageKey) as? [String:String] ?? [:]
            var covered: [String] = []
            do {
                let active = try manager.alarms
                let activeIDs = Set(active.map { $0.id })
                for (key, raw) in stored {
                    guard let id = UUID(uuidString:raw) else { stored.removeValue(forKey:key); continue }
                    if desired[key] == nil {
                        if activeIDs.contains(id) {
                            do { try manager.cancel(id:id) } catch { continue }
                        }
                        stored.removeValue(forKey:key)
                    } else if !activeIDs.contains(id) {
                        stored.removeValue(forKey:key)
                    }
                }
                defaults.set(stored,forKey:storageKey)
                for (key,item) in desired.sorted(by:{ ($0.value["at"] as? Double ?? 0) < ($1.value["at"] as? Double ?? 0) }) {
                    guard let at = item["at"] as? Double, at > now else { continue }
                    if let raw=stored[key], let id=UUID(uuidString:raw), activeIDs.contains(id) {
                        covered.append(key); continue
                    }
                    let id=UUID()
                    let title=String((item["title"] as? String ?? "Momentum").prefix(80))
                    let stop=String((item["stopLabel"] as? String ?? "Stop").prefix(32))
                    let alert=AlarmPresentation.Alert(title: LocalizedStringResource(stringLiteral:title),stopButton:AlarmButton(text:LocalizedStringResource(stringLiteral:stop),textColor:.white,systemImageName:"stop.circle"))
                    let attributes=AlarmAttributes(presentation:AlarmPresentation(alert:alert),metadata:MomentumAlarmMetadata(occurrence:key),tintColor:Color(red:0.39,green:0.33,blue:0.85))
                    let config=AlarmManager.AlarmConfiguration<MomentumAlarmMetadata>(schedule:.fixed(Date(timeIntervalSince1970:at/1000)),attributes:attributes)
                    // Persist the identifier before calling the OS so a terminated app can reconcile it.
                    stored[key]=id.uuidString
                    defaults.set(stored,forKey:storageKey)
                    do { _ = try await manager.schedule(id:id,configuration:config); covered.append(key) }
                    catch { stored.removeValue(forKey:key); defaults.set(stored,forKey:storageKey) }
                }
                call.resolve(["covered":covered,"status":"granted"])
            } catch { call.resolve(["covered":covered,"status":"error"]) }
        }
    }
}
