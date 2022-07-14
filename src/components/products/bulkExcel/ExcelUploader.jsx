import React from 'react';
import LoadingButton from '../../formComponents/LoadingButton';

const ExcelUploader = (props) => {
  const {
    loading,
    fileName,
    handleExcelTemplateDownload,
    readExcel,
    handleExcelDataUpload,
  } = props;
  return (
    <div className="border rounded shadow p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2">
          <div className="my-auto">1. Download excel template:</div>
          <button
            onClick={handleExcelTemplateDownload}
            className="px-2 py-1 border border-purple-600 bg-purple-50 hover:bg-purple-100 text-purple-600 text-center rounded cursor-pointer"
          >
            Click to download
          </button>
        </div>
        <div>
          2. Open excel file and in the "data" sheet, for each product:
          <ul className="pl-12 py-2">
            <li>a) Choose childCategory from cell dropdown [E.g. T-shirt]</li>
            <li>
              b) Type product brand name [E.g. "Nike"] or type "Unbranded" in
              case of generic products
            </li>
            <li>
              c) Enter product name [E.g. Navy Blue Slim Fit Checked Casual
              Shirt]
            </li>
            <li>d) Enter brief product description (in 2-3 lines)</li>
            <li>
              e) Choose suitable customer gender from dropdown [E.g. Male]
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2">
          <div className="my-auto">3. Choose saved excel file to upload</div>
          <label
            htmlFor="excelFile"
            className="px-2 py-1 border border-purple-600 bg-purple-50 hover:bg-purple-100 text-purple-600 text-center rounded cursor-pointer"
          >
            {fileName && fileName !== ''
              ? `File: ${fileName}`
              : 'Choose excel/csv file'}
          </label>
          <input
            id="excelFile"
            type="file"
            accept=".csv, .xlsx, .xls, .xlsb"
            onChange={(e) => readExcel(e.target.files[0], e)}
            className="hidden"
          />
        </div>
        <div className="pt-4">
          {loading ? (
            <LoadingButton />
          ) : (
            <button
              onClick={handleExcelDataUpload}
              className="w-full px-2 py-1 border border-blue-600 bg-blue-50 hover:bg-blue-100 text-blue-600 text-center rounded cursor-pointer"
            >
              Verify data below and then click to create products for entered
              data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader;
