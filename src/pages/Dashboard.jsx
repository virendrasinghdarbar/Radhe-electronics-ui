import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Dashboard(){

const auth=useAuth();

const navigate=useNavigate();

const logout=()=>{

auth.logout();

navigate("/login");

};

return(

<div className="container mt-5">

<h2>

Welcome Dashboard

</h2>

<button

className="btn btn-danger"

onClick={logout}

>

Logout

</button>

</div>

);

}

export default Dashboard;