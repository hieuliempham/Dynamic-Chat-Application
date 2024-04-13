export const baseUrl = "http://localhost:3000/api";

export const postRequest = async(url, body) =>{
    console.log("body", body);
    const respone = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body,
    });
    
    const data = await respone.json();

    if(!respone.ok){
        let message;

        if(data?.message){
            message = data.message;
        } else{
            message = data;
        }


        return {error: true, message}
    }

    return data;
}