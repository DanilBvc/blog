import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { eye, eyeoff } from '../../assets/generalIcons/checkBoxIcons';
import FormError from '../../components/general/formError/formError';
import { buttonType } from '../../components/general/submitButton/submitButton.type';
import Heading from '../../components/general/title/heading';
import { baseUrl, registerUrl, uploadPostImage } from '../../utils/network';
import { unauthorizedRequest } from '../../utils/queries';
import Field from '../../components/general/inputField/inputField';
import SubmitButton from '../../components/general/submitButton/submitButton';
import { registerModelType } from './register.type';
import axios from 'axios';

const Register = () => {
  const [registerData, setRegisterData] = useState<registerModelType>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      formData.append('image', files[0]);
      try {
        const { data } = await axios.post(uploadPostImage, formData);
        setRegisterData({
          ...registerData,
          avatarUrl: `${baseUrl}${data.url}`,
        });
      } catch (err) {
        setError(true);
        setErrorText('Only .png, .jpg and .jpeg format allowed!');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      registerData.password.length >= 6 &&
      /[a-zA-Z]/g.test(registerData.password) &&
      /[0-9]/g.test(registerData.password)
    ) {
      const registerResponse = unauthorizedRequest(registerUrl, 'POST', registerData);

      registerResponse
        .then((responce) => {
          new Promise<void>((resolveOuter) => {
            setError(false);
            localStorage.setItem('token', responce.token);
            resolveOuter();
          }).then(() => {
            navigate(`/`);
          });
        })
        .catch((err) => {
          setError(true);
          setErrorText(String(err));
        });
    } else {
      setError(true);
      setErrorText(
        'The password has to be at least 6 characters length and has to include number and letters.'
      );
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setRegisterData({
      ...registerData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="registration-wrraper">
          <div className="registration-header-container">
            <div className="registration-header">
              <Heading text="Create an account" />
            </div>
            <h4 className="registration-header">
              Have an account? <Link to={`/login`}>Sign in</Link>
            </h4>
          </div>

          <FormError errorText={errorText} appear={error} />

          <div className="registration-info">
            <div className="fields-container">
              <Field
                name="fullName"
                placeholder="FullName"
                value={registerData.fullName}
                onChange={handleChange}
                type="text"
              />
              <Field
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleChange}
                type="email"
              />
              <div className="field-container">
                <Field
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  minLength={6}
                  value={registerData.password}
                  onChange={handleChange}
                />
                <span
                  title={passwordVisible ? 'hide password' : 'show password'}
                  className="input-icon"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                >
                  {passwordVisible ? eye : eyeoff}
                </span>
              </div>

              <Field
                name="confirmPassword"
                minLength={6}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Repeat password"
                value={registerData.confirmPassword}
                onChange={handleChange}
              />
              <div
                className="register-profile-picture"
                onClick={() => {
                  inputFileRef.current?.click();
                }}
              >
                <input
                  type="file"
                  id="profile-picture"
                  name="image"
                  onChange={handleImageFile}
                  ref={inputFileRef}
                  hidden
                />
                <label htmlFor="profile-picture">Choose your avatar</label>
                {registerData.avatarUrl.length > 0 ? (
                  <img
                    className="user-profile-pict"
                    src={registerData.avatarUrl}
                    alt="user-profile"
                  />
                ) : null}
              </div>
            </div>
            <SubmitButton type={buttonType.submit} text="Create" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
