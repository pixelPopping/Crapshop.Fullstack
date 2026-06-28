const formatTime = () => {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "pm" : "am";

    const template = "hh:mm:ss tt";
    return template
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("ss", seconds)
        .replace("tt", ampm);
};

export default formatTime;