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
}

export default FilmService