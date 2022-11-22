import { Modal, View } from "react-native";
import ModalPoupItem from "./ModalPoupItem";
import { styles } from "./ModalPoupStyle";
import Arabic from "../Flags/ar.jpg";
import English from "../Flags/en.png";
import German from "../Flags/de.png";
import Turkish from "../Flags/tr.jpg";
import Italy from "../Flags/it.jpg";
import France from "../Flags/fr.jpg";

const ModalPoup = ({ visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ModalPoupItem
            visible={visible}
            local={"en"}
            language={"English"}
            flag={English}
          />
          <ModalPoupItem
            visible={visible}
            local={"de"}
            language={"German"}
            flag={German}
          />
          <ModalPoupItem
            visible={visible}
            local={"it"}
            language={"Italy"}
            flag={Italy}
          />
          <ModalPoupItem
            visible={visible}
            local={"tr"}
            language={"Turkish"}
            flag={Turkish}
          />
          <ModalPoupItem
            visible={visible}
            local={"fr"}
            language={"France"}
            flag={France}
          />
          <ModalPoupItem
            visible={visible}
            local={"ar"}
            language={"Arabic"}
            flag={Arabic}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPoup;
