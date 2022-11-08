import React, { useState, useCallback, FunctionComponent } from 'react';
import { signUp, checkDuplicateEmail } from '@/modules/api';


interface SignUpProps { }

const SignUp: FunctionComponent<SignUpProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [pwd, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailDuplicate, setEmailDuplicate] = useState<boolean>(true);
  const [emailCheckState, setEmailCheckState] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const [isEmailBlur, setIsEmailBlur] = useState<boolean>(true);
  const [isPasswordBlur, setIsPasswordBlur] = useState<boolean>(true);
  const [isPasswordConfirmBlur, setIsPasswordConfirmBlur] =
    useState<boolean>(true);
  

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
        setEmailCheckState(false);
        setIsEmail(false);
      } else {
        setIsEmail(true);
        setEmailCheckState(false);
        setEmailDuplicate(true);
        setEmailMessage('이메일 중복 확인이 필요해요!');
      }
    },
    [],
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-?_~])(?=.*[0-9]).{8,15}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('안전한 비밀번호에요 : )');
        setIsPassword(true);
      }
    },
    [],
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (pwd === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ');
        setIsPasswordConfirm(false);
      }
    },
    [pwd],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSignUp = signUp(email, pwd).then(data => {
      if (data) {
        console.log(data);
      }
    });
  };

  const checkEmail = async (currentEmail: string) => {
    const status = await checkDuplicateEmail(currentEmail);
    if (status === true) {
      setEmailCheckState(true);
      setEmailMessage('이메일 인증이 완료되었습니다 : )');
      setEmailDuplicate(false);
    } else {
      setEmailMessage('이미 가입된 이메일이에요 .. 다시한번 확인해 주세요!');
      setEmailDuplicate(true);
      setEmailCheckState(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black ">
          <div className='pb-6'><img src="https://j7d108.p.ssafy.io/resource/logo.png" alt="" className='w-14 h-14' /></div>
          <h1 className="mb-4 text-xl leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            회원가입
          </h1>
          <input
            id="Email"
            onChange={onChangeEmail}
            type="text"
            className={`my-2 block w-full rounded border p-3  ${isEmailBlur
                ? 'border-stone-200'
                : `${isEmail ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="email"
            placeholder="이메일"
            onBlur={() => {
              setIsEmailBlur(false);
            }}
            required
          />
          <div className="flex justify-between">
            {email.length > 0 && (
              <span
                className={`text-[0.7rem] ${isEmail && !emailDuplicate && emailCheckState
                    ? 'text-blue-400'
                    : 'text-gray-500'
                  }`}
              >
                {emailMessage}{' '}
              </span>
            )}
            {isEmail && emailDuplicate ? (
              <span
                onClick={() => {
                  checkEmail(email);
                }}
                className="text-[0.7rem] text-blue-600"
              >
                이메일 중복 확인하기
              </span>
            ) : (
              ''
            )}
          </div>

          <input
            id="Password1"
            onChange={onChangePassword}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordBlur
                ? 'border-stone-200'
                : `${isPassword ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="pwd"
            placeholder="비밀번호"
            required
          />
          {pwd.length > 0 && (
            <span
              className={`text-[0.7rem] ${isPassword ? 'text-blue-400' : 'text-gray-500'
                }`}
            >
              {passwordMessage}
            </span>
          )}
          <input
            id="Password2"
            onChange={onChangePasswordConfirm}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordConfirmBlur
                ? 'border-stone-200'
                : `${isPasswordConfirm ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="confirm_password"
            placeholder="비밀번호 확인"
            required
          />
          {passwordConfirm.length > 0 && (
            <span
              className={`text-[0.7rem] ${isPasswordConfirm ? 'text-blue-400' : 'text-gray-500'
                }`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          
          {/* input box end */}
          <button
            type="submit"
            className={`my-1 w-full rounded-lg ${!(
                isEmail &&
                isPassword &&
                isPasswordConfirm &&
                emailCheckState
              )
                ? 'bg-gray-400'
                : 'bg-blue-500'
              } py-2.5 text-center text-white focus:outline-none`}
            disabled={
              !(
                isEmail &&
                isPassword &&
                isPasswordConfirm &&
                emailCheckState
              )
            }
          >
            회원가입하기
          </button>
        </div>

        <div className="mb-6 text-stone-600">
          이미 회원이신가요?_?
          <a className="text-blue-500" href="../login/">
            로그인하기
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
