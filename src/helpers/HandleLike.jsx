function HandleLike(setRecencies, recencies) {
    return function (index) {
        const updated = [...recencies];
        updated[index].likes += 1;
        setRecencies(updated);
        localStorage.setItem("recencies", JSON.stringify(updated));
    };
}

export default HandleLike;

