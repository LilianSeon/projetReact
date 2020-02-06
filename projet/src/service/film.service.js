const baseUrl = "http://localhost:3001";

class FilmService{

    static async list(){
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        let call = await fetch(`${baseUrl}/film`, init);
        return call;

    }

    static async detail(id){
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        let call = await fetch(`${baseUrl}/film/${id}`, init);
        return call;
    }

    static async update(id, bodyFilm){
        let init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bodyFilm)
        }
        let call = await fetch(`${baseUrl}/film/${id}`, init);
        return call;
    }

    static async create(body){
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/film`, init);
        return call;
    }

}

export default FilmService