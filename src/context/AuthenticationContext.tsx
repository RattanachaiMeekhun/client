import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthenticationProviderProps {
  children: ReactNode;
}
export interface IToken {
  token: string;
  tokenexpire: string;
}

export interface IUserData {
  avatarUrl: string;
}

export interface IAuthenticationDetail {
  isAuthenticated: boolean;
  token?: IToken;
  userData?: IUserData;
}

interface IAuthenticationContextType {
  authDetail: IAuthenticationDetail;
  updateAuthDetail: (params: Partial<IAuthenticationDetail>) => void;
  onLogout: () => void;
}

const AuthenticationContext = createContext<IAuthenticationContextType | null>(
  null
);

const AuthenticationContextProvider: React.FC<AuthenticationProviderProps> = (
  props
) => {
  const [authDetail, setAuthDetail] = useState<IAuthenticationDetail>({
    isAuthenticated: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const avatar = window.localStorage.getItem("avatar") || "";

    if (token) {
      updateAuthDetail({
        isAuthenticated: true,
        userData: {
          avatarUrl:
            "https://paksod-api.wolfapprove.com/dev/tmp/images/user/" + avatar,
        },
      });
    } else {
      updateAuthDetail({ isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    if (authDetail.isAuthenticated) {
      onIsAuthenticated();
    }
  }, [authDetail]);

  const onLogout = () => {
    updateAuthDetail({
      isAuthenticated: false,
      token: undefined,
      userData: undefined,
    });
    navigate("/");
    window.localStorage.clear();
  };

  const onIsAuthenticated = async () => {
    navigate("/");
  };

  const updateAuthDetail = (params: Partial<IAuthenticationDetail>) => {
    setAuthDetail((prevSettings) => ({
      ...prevSettings,
      ...params,
    }));
  };

  return (
    <AuthenticationContext.Provider
      value={{ authDetail, updateAuthDetail, onLogout }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContextProvider, AuthenticationContext };
