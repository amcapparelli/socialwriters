
export const authorID = () => {
    const url = window.location.pathname
    const autorId = url.substring(url.lastIndexOf('/')+1);
    return autorId
}

export default authorID