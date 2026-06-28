function DropDown({ onSelect, quantity }) {
    return (
        <section>
            <select
                value={quantity}
                onChange={(e) => onSelect(parseInt(e.target.value))}
            >
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
        </section>
    );
}

export default DropDown;

