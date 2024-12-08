import { Prisma } from "database/.prisma/client";
import axios from "axios";

function Example() {

    async function postData() {

        const data: Prisma.FeedbackCreateInput = {
            name: 'Mike',
            feedback: 'is an SA'
        }
        //sends a post request the /api/high-score
        const res = await axios.post("/api/example", data);
        if(res.status === 200) {
            console.log("added feedback");
        }
    }

    async function getData() {
        const res = await axios.get("api/example");
        console.log(res.data);
    }

    return (
        <div className="App">
            <button className={"m-4 bg-red-800 p-4 rounded-2xl text-white hover:bg-red-200 hover:text-black"} onClick={postData}>post feedback</button>
            <button className={"m-4 bg-red-800 p-4 rounded-2xl text-white hover:bg-red-200 hover:text-black"} onClick={getData}>get feedback</button>
        </div>
    );
}

export default Example;
