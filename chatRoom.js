// Selects msg container
let msgContainer = document.querySelector(".user-comments");
//select input 
let cmntMsg = document.querySelector("#txt-box");
//create and select a div for msg to populate 
const cmntContainer = document.querySelector(".allMessages")
// select submit button and give it an event listiner 
const subBtn = document.querySelector(".comment-btn");
//input selector



//apply event listiner to button
subBtn.addEventListener("click", updateDB);

// create  section to set up fire base
const db = firebase.firestore();
//Updates the database with message

function updateDB(event) {
	event.preventDefault();
	const message = cmntMsg.value;

	cmntMsg.value = "";

	console.log(message)

	db.collection("message").add({
		message: message ,

		//add message with time stamp

		created: firebase.firestore.FieldValue.serverTimestamp()
	}).then(function(docRef) {
		console.log("Document written with ID: ", docRef);
		let newDiv = document.createElement('div');
			newDiv.classList.add("comment-box");

			newDiv.innerHTML = `<p class="message">${message} </p>`;

	 		msgContainer.append(newDiv);
	})
	
	// .then(
	// 	function (docRef) {
	// 		docRef.get().then(doc => doc.data().message)
	// 		let newDiv = document.createElement('div');
	// 		newDiv.classList.add("comment-box");

	// 					newDiv.innerHTML = `<p class="message">${message} </p>`;

	// 		msgContainer.append(newDiv.innerHTML = `<p class="message">${message} </p>`);
	// 	}
	.catch(
		function (error) {
			console.error("All this hard work to mess up: ", error);
		}
	);
}



	db.collection('messages').orderBy('create', 'asc').get().then(
		function (response) {
			response.forEach(
				function (doc) {
					let msg = doc.data();
					let newP = document.createElement('p');
					newP.innerText = `${msg.message}`;
					msgContainer.append(newP);
				}
			)
		}
	);
