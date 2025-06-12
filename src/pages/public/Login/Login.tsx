import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { login } from "./types/login.types";
import styles from "./Login.module.css";
import LoginService from "./services/Login.service";
import { loginSuccess, logout } from "../../../redux/slices/auth.slice";
import { PrivateRoutes, PublicRoutes } from "../../../routes/routes";
import { axiosError } from "../../../utilities/https.utility";
import Loader from "../../../components/Loading/Loading";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<login>({
    name: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(logout());
    const ping = async () => await LoginService.ping();
    ping();
    window.scrollTo(0, 0);
    const name = searchParams.get("name");
    const password = searchParams.get("password");

    if (name && password) {
      setFormData({ name: name.toLowerCase(), password: password.toLocaleLowerCase() });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (status) {
        setIsLoading(true);
        setStatus(false);
        const res = await LoginService.login(formData);
        dispatch(loginSuccess({ token: res.access_token, user: res }));
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`);
      }
    } catch (err: any) {
      setStatus(true);
      setIsLoading(false);
      setError(`${axiosError(err).message}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.containerForm}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() =>
                navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.HOME}`)
              }
            >
              <FiArrowLeft className={styles.backIcon} />
              Volver
            </button>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.title}>Inicia sesión</h2>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Usuario
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Tu contraseña"
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.button}>
                Acceder
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
