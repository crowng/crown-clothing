import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBgRGzaENgwojR9X6S3WZ2x9ZZn9m_jnV0',
	authDomain: 'crown-db-7c03e.firebaseapp.com',
	projectId: 'crown-db-7c03e',
	storageBucket: 'crown-db-7c03e.appspot.com',
	messagingSenderId: '197506920878',
	appId: '1:197506920878:web:1a497f2ac1fb8f693bd83f',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	console.log(userDocRef);

	const userSnapShot = await getDoc(userDocRef);
	console.log(userSnapShot);
	console.log(userSnapShot.exists());

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		//if user data does not exist -set document with the data from userauth in my collection
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
		// check if user data exist
		// return
		return userDocRef;
	}
};
