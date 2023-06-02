import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subtitle="Sorry, the page you are trying to access does not exist"
      extra={
        <Button type="primary">
          <Link to={{ pathname: "/dashboard" }} style={{ color: "#ffffff" }}>
            Back to Dashboard
          </Link>
        </Button>
      }
    />
  );
};
