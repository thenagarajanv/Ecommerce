import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google user signed in:', user);
  } catch (error) {
    console.error('Error during Google sign-in:', error.message);
  }
};

const GoogleSignInComponent = () => {
  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default GoogleSignInComponent;
