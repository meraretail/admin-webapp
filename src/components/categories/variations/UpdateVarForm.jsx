import React, { useEffect, useState } from 'react';
import {
  getSimilarVariations,
  getVariationById,
  updateVariationById,
} from '../../services/variationAPIs';
import ItemContainer from '../common/ItemContainer';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

const UpdateVarForm = ({ id, setResStatus, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [orgVar, setOrgVar] = useState({});
  const [variation, setVariation] = useState('');
  const [variesImage, setVariesImage] = useState(false);
  const [similarVariations, setSimilarVariations] = useState([]);

  // Step 1: fetch variation data
  useEffect(() => {
    setLoading(true);
    getVariationById(id)
      .then((res) => {
        setOrgVar(res.data.variation);
        setVariation(res.data.variation.name);
        setVariesImage(res.data.variation.variesImage);
      })
      .catch((err) => {
        setResStatus(err.data.statusText);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResStatus]);

  // Step 2: Search similar variations using useEffect with 1 sec delay
  useEffect(() => {
    if (variation === '' || variation === orgVar.name) {
      setSimilarVariations([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await getSimilarVariations(variation);
      setSimilarVariations(response.data.variations);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [orgVar, variation]);

  // Step 3: Edit variation
  const handleEditVariation = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await updateVariationById(id, variation, variesImage);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);

    if (statusText === 'OK') {
      setVariation('');
      setVariesImage(false);
    }
  };

  return (
    <ItemContainer title="Update variation name">
      <form onSubmit={handleEditVariation} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <FormInput
            label="Variation name"
            id="variation"
            type="text"
            placeholder="Enter variation name"
            value={variation}
            onChange={(e) => setVariation(e.target.value)}
          />
          {/* variesImage choose from dropdown */}
          <div className="border border-gray-300 rounded flex items-center gap-4 pl-2">
            <div className="text-sm font-semibold whitespace-nowrap">
              Does product image varies with change
            </div>
            <select
              className="w-full font-semibold text-sm p-2 border outline-none"
              id="variesImage"
              value={variesImage}
              onChange={(e) => setVariesImage(e.target.value === 'true')}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          {/* variesImage ends */}
        </div>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            text="Update variation"
            className="opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100"
          />
        )}
      </form>
      <SimilarNames label="Similar variation names" array={similarVariations} />
    </ItemContainer>
  );
};

export default UpdateVarForm;
