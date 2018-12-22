
export const fetchUsers = () => 
    fetch('https://randomuser.me/api/?results=10&seed=xxx')
        .then(response => response.json())
        .then(usersFromApi => localStorage.setItem('writers', JSON.stringify(usersFromApi.results)))
        .catch(error => console.log('Hubo un error', error))

export default fetchUsers


