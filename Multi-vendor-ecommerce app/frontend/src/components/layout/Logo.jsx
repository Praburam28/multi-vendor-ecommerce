import { Store } from "lucide-react";

export default function Logo() {

    return (

        <div className="flex items-center gap-2">

            <Store
                size={30}
                className="text-indigo-600"
            />

            <h1 className="text-2xl font-bold text-indigo-600">

                MultiVendor

            </h1>

        </div>

    );

}