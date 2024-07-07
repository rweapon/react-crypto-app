import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../context/CryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";
const { Header } = Layout;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  background: "white",
  height: 60,
  padding: "1rem",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => event.key === "/" && setSelect((prev) => !prev);
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        style={{
          width: 250,
        }}
        open={select}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Header>
  );
}
