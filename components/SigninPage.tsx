const SigninPage: React.FC = () => {
  return (
    <form>
      <p>
        <label>닉네임</label>
        <input type="text"></input>
      </p>
      <p>
        <label>아이디</label>
        <input type="text"></input>
      </p>
      <p>
        <label>비밀번호</label>
        <input type="password"></input>
      </p>
      <p>
        <label>이메일</label>
        <input type="email"></input>
      </p>
      <button>가입하기</button>
    </form>
  );
};
export default SigninPage;
