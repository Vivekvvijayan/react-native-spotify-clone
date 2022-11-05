export const toTime = (time) => {
    let num = time;
    let sec = num/1000
    let Ssec = Math.floor(sec)

    let m = Ssec/60
    let M = Math.round(m)

    let h = Math.floor(M/60)
    return h+' h '+Math.floor(M/10)+' minutes'
}