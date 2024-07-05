import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formPostRequest } from "../../../utility/apiRequests/formPostRequest";
import EntryForm from "../entryForm/EntryForm";
import CampaignEntryForm from "../campaignEntryForm/CampaignEntryForm";
import CharacterEntryForm from "../characterEntryForm/CharacterEntryForm";
import useCampaignId from "../../../utility/hooks/useCampaignId";
import deleteImageByUrl from "../../../utility/otherFunctions/deleteImageByUrl";
import useUserId from "../../../utility/hooks/useUserId";
import PropTypes from "prop-types";

/** Wrapper for form handling
 * @param {string} type - "location"/"object" type of database entry that should be created/updated.
 * @param {string} mode - "create"/"update" type of CRUD action to be performed on entry.
 * @param {function} updateParent - function to rerender parent.
 * @param {function} onClose - parent function to close form.
 * @param {object} [prevData] - previously displayed entry data only needed in update action.
 */
const FormWrapper = ({ type, mode, onClose, updateParent, prevData }) => {
  const campaignId = useCampaignId()[0];
  const userId = useUserId()[0];
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(
    prevData && prevData.image ? prevData.image : "",
  );
  const [prevRenderUrl, setPrevRenderUrl] = useState(
    prevData && prevData.image ? prevData.image : "",
  );

  const handleUrlChange = (url) => {
    if (!prevRenderUrl) {
      setPrevRenderUrl(url);
    } else if (url !== prevRenderUrl) {
      deleteImageByUrl(prevRenderUrl);
      setPrevRenderUrl(url);
    }

    setImageUrl(url);
  };

  const handleSubmissionClose = () => {
    if (prevData && prevData.image && prevData.image !== imageUrl) {
      onClose(prevData.image);
    } else {
      onClose();
    }
  };

  const handleAbortClose = () => {
    imageUrl ? onClose(imageUrl) : onClose();
  };

  const uri =
    mode === "create"
      ? `https://pnp-backend.fly.dev/api/v1/${type === "campaign" ? userId : campaignId}/${type}/create`
      : `https://pnp-backend.fly.dev/api/v1/${type}/${prevData._id}/update`;

  useEffect(() => {
    const closeForm = (event) => {
      if (event.key === "Escape") {
        imageUrl ? onClose(imageUrl) : onClose();
      }
    };
    window.addEventListener("keydown", closeForm);

    return () => {
      window.removeEventListener("keydown", closeForm);
    };
  }, [imageUrl, onClose]);

  const handleFormSubmission = async (event) => {
    const result = await formPostRequest(event, uri);

    if (result[0]) {
      console.error(result[0].msg);
    } else {
      updateParent(result.data);
      handleSubmissionClose();
      mode === "create"
        ? navigate(`/${type}s`)
        : navigate(`/${type}/${prevData._id}`);
    }
  };

  const formProps = {
    type,
    handleAbortClose,
    handleFormSubmission,
    handleUrlChange,
    prevData,
  };

  let FormComponent;

  switch (type) {
    case "campaign":
      FormComponent = CampaignEntryForm;
      break;
    case "character":
      FormComponent = CharacterEntryForm;
      break;
    default:
      FormComponent = EntryForm;
      break;
  }

  return <FormComponent {...formProps} />;
};

EntryForm.propTypes = {
  type: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  updateParent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  prevData: PropTypes.object,
};

export default FormWrapper;
