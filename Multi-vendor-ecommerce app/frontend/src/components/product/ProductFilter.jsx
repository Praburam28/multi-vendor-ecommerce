export default function ProductFilter({
    categories,
    selected,
    onChange
}) {

    return (

        <select
            value={selected}
            onChange={onChange}
            className="rounded-xl border p-3"
        >

            <option value="">

                All Categories

            </option>

            {

                categories.map(category => (

                    <option
                        key={category.id}
                        value={category.id}
                    >

                        {category.name}

                    </option>

                ))

            }

        </select>

    );

}