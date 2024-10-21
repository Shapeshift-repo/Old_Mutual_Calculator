import {
  Document,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import { toBlob, toJpeg, toPixelData, toPng, toSvg } from "html-to-image";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

useEffect(() => {
  const capture = async () => {
    const node = document.getElementById("resultChart");
    const response = await htmlToImage.toPng(node);
    setCapture(response);
  };
  capture();
}, [capture]);

const MyDoc = (graphImage) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <Image
            src={graphImage.graphImage}
            style={{ width: 300, height: 200 }}
            alt="Section 1"
          />
        </View>
      </Page>
    </Document>
  );
};

<PDFDownloadLink
  document={<MyDoc graphImage={capture} />}
  fileName="somename.pdf"
>
  {({ blob, url, loading, error }) =>
    loading ? "Loading document..." : "Download now!"
  }
</PDFDownloadLink>;
