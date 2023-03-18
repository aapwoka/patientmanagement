//var config = {
 // apiKey: "AIzaSyD94SWwZAiJ-wO3EdFyKUd2PxOFRnRS9Jg",
  //authDomain: "patient-47a96.firebaseapp.com",
  //databaseURL: "https://patient-47a96-default-rtdb.firebaseio.com",
  //projectId: "patient-47a96",
 // storageBucket: "patient-47a96.appspot.com",
  //messagingSenderId: "1080833709367",
  //appId: "1:1080833709367:web:7d0c5ce904f6bc0664f6b2",
  //measurementId: "G-9LSZ9DGFRZ"
//};

const config = {
    apiKey: "AIzaSyB_84depTMkGIAxnkNScxTD7Bzb9Z19Vzk",
	databaseURL:"https://savedatasavelife-default-rtdb.firebaseio.com",
    authDomain: "savedatasavelife.firebaseapp.com",
    projectId: "savedatasavelife",
    storageBucket: "savedatasavelife.appspot.com",
    messagingSenderId: "210547739332",
    appId: "1:210547739332:web:bb1c483867f761baecd791",
    measurementId: "G-HS9L441EX9"
  };
   

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  
  function signUp(){
    var userEmail = document.getElementById("usr").value;
    var userPassword = document.getElementById("pwd1").value;
	var passwordRepeat = document.getElementById("pwd2").value;
   
 if(userPassword!=passwordRepeat){
		window.alert("Passwords do not match");
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: "https://www.facebook.com/",
                userTw: "https://twitter.com/",
                userGp: "https://plus.google.com/",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);
            window.alert("Succesfully Signed Up.Continue to sign In...").then((value) => {
                
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
}


function collection(){
	window.location ="record.html"
}
function home(){
	window.location ="index.html"
}
function editRecord(){
	window.location="editRecord.html"
}

// Firebase Database Reference and the child




	
// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)




function addRecord(){
    var usersRef = dbRef.child('users');
	var name = document.getElementById('entry_name')
	var sex = document.getElementById('entry_sex')
	var illness = document.getElementById('entry_illness')
	var admission = document.getElementById('entry_admissiondate')
	var discharge = document.getElementById('entry_dischargedate')
	var checkup = document.getElementById('entry_checkdate')
	var history = document.getElementById('entry_history')
	var contact = document.getElementById('contact')
     
    var newPatient={
		name:name.value,
		sex:sex.value,
		illness:illness.value,
		admission:admission.value,
		discharge:discharge.value,
		checkup:checkup.value,
		history:history.value,
		contact:contact.value
	}

	usersRef.push(newPatient)
}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('users/' + userID);

		userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

	document.getElementById('edit-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
					editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "none";


}