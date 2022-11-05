const colors = [
    "#15ff82",
    "#516395",
    "#1d2671",
    "#535353",
    "#1db952",
    "#17212d",
    "#FF9900"
]


export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
