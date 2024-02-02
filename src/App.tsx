import FileUpload from "./components/FileUpload";


function App() {
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'demo'
      }
    });
  return (
    <div className="App">
      <FileUpload />
    </div>
  );
}

export default App;
