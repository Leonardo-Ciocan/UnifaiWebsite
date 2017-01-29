import { Service } from './Service';
import { services } from './API';
export class Utils {
    static extractServiceFromMessage(message : string) : Service {
        let serviceName = message.split("@")[1].split(" ")[0]
        return services.filter( s => s.name.toLowerCase() == serviceName )[0];
    }
}