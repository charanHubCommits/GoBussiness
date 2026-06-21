import {useState} from "react"

const ReferralShareItem = ({ label, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="share-field-container">
      <p>{label}</p>
      <div className="input-group">
        <input type="text" readOnly value={value} />
        <button type="button" onClick={handleCopy}>
          Copy
        </button>
      </div>
      {isCopied && <span className="copied-toast">Copied to clipboard!</span>}
    </div>
  );
};

export default ReferralShareItem


