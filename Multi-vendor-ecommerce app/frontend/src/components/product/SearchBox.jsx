import { Search } from "lucide-react";

export default function SearchBox({
    value,
    onChange
}) {

    return (

        <div className="relative">

            <Search
                className="absolute left-4 top-3"
                size={18}
            />

            <input
                value={value}
                onChange={onChange}
                placeholder="Search Products..."
                className="w-full rounded-xl border pl-12 pr-4 py-3 shadow-sm"
            />

        </div>

    );

}