import { useTranslation } from "react-i18next";

const Error404 = () => {
  const { t } = useTranslation();

  return (
    <div className="p-10">
      <h2>{t("Error")} 404!</h2>
      <h5>{t("Page not found")}!</h5>
    </div>
  );
};

export default Error404;
