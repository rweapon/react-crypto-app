import { Layout, Typography } from "antd";
import { useCrypto } from "../context/CryptoContext";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";
const { Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((a, b) => (a += b), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Content>
  );
}
