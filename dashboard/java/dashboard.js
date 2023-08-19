import { onAuthStateChanged, signOut, auth, addDoc, collection, getDocs, db, doc } from "./../../login/java/fireBase.js";

let uid = localStorage.getItem("uid")
let userid;
const querySnapshot = await getDocs(collection(db, "Hackathon"));
        querySnapshot.forEach((doc) => {
            console.log( " => ", doc.data().uid)
if(doc.data().uid == uid){
    userid =  uid;
}
            
        })
        console.log(userid)
// console.log(uid)

const publishbtn = document.getElementById("publishbtn");
const inputText = document.getElementById("inputText");
const title = document.getElementById("title");
const blogsContainer = document.getElementById("blogs");
publishbtn.addEventListener("click", async () => {
    blogsContainer.innerHTML += `
    <div class="blog-container mt-4">
    <div class="d-flex align-items-baseline">
        <div class="blog-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3tx9PMv5nwkg4hDg6QlKEY0lva4loK361NwB2L0yZw&s"
                alt="">
        </div>
        <div class="blogText-container">

            <div class="blog-mainText">
            ${title.value}
            </div>
            <div class="d-flex">

                <div class="subText">
                    ELon Musk
                </div>
                <div class="subText">
                    - August 17th, 2023
                </div>
            </div>
        </div>
    </div>
    <div class="blogSummary">
       ${inputText.value}
    </div>
    <button class="custombtn">Edit</button>
    <button class="custombtn">Delete</button>
</div>
    `
    let obj = {
        title: title.value,
        inputText: inputText.value
    }
    console.log(obj)
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            ...obj
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

})


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        if (location.pathname == '/login//registration.html') {
            location.href = "../dashboard/dashboard.html"
        }
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            blogsContainer.innerHTML += `
            <div class="blog-container mt-4">
            <div class="d-flex align-items-baseline">
                <div class="blog-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3tx9PMv5nwkg4hDg6QlKEY0lva4loK361NwB2L0yZw&s"
                        alt="">
                </div>
                <div class="blogText-container">
        
                    <div class="blog-mainText">
                    ${doc.data().title}
                    </div>
                    <div class="d-flex">
        
                        <div class="subText">
                            ELon Musk
                        </div>
                        <div class="subText">
                            - August 17th, 2023
                        </div>
                    </div>
                </div>
            </div>
            <div class="blogSummary">
               ${doc.data().inputText}
            </div>
            <button class="custombtn" onclick="editBlog(this)">Edit</button>
            <button class="custombtn">Delete</button>
        </div>
            `
        });
    } else {
        //console.log("...")
    }
});



const logoutBtn = document.getElementById("logout-btn")

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "./../../index.html"
    }).catch((error) => {
        // An error happened.
    });

})

const editBlog = (a)=>{
    console.log(a)
}

window.editBlog = editBlog