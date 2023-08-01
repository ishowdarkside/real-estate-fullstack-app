import { useEffect } from "react";
import { useGetProfileData } from "../../hooks/useGetProfileData";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./SpecificProfile.module.scss";
import { useProfileContext } from "../../context/profileContext";
import ProfileInfo from "./ProfileInfo";
import { useCurrUser } from "../../hooks/useCurrUser";
import { useNavigate } from "react-router-dom";
import ActivePostPanel from "./ActivePostPanel";
export default function SpecificProfile() {
  const { data, isLoading } = useGetProfileData();
  const { setActiveProfile } = useProfileContext();
  const { data: currUser } = useCurrUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data.status === "success")
      setActiveProfile(data.validProfile);
  }, [data, isLoading, setActiveProfile]);

  if (isLoading) return <Spinner />;
  {
    /*AKO POSTOJI ULOGOVAN USER I AKO JE NEJGOV ID JEDNAK ID-u PROFILA KOJI SE TRAZI, REDIRECTUJ USERA NA /me page */
  }
  if (currUser && currUser._id === data.validProfile?._id)
    return navigate("/app/me");
  if (data.status === "fail")
    return <span className={styles.errorMessage}>Profil nije pronađen 🤷🏽‍♀️</span>;
  return (
    <div className={styles.pageBody}>
      <div className={`container ${styles.profileContainer}`}>
        <ProfileInfo />
        <ActivePostPanel />
      </div>
    </div>
  );
}
