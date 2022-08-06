import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import PageTitle2Btn from '../../components/common/PageTitle2Btn';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ExcelDataPreview from '../../components/products/bulkExcel/ExcelDataPreview';
import ExcelUploader from '../../components/products/bulkExcel/ExcelUploader';
import {
  bulkAddProducts,
  getProductBulkUploadTemplate,
} from '../../apis/product.apis';

const BulkAddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  const [uploadedExcelData, setUploadedExcelData] = useState([]);
  const [fileName, setFileName] = useState('');

  const readExcel = async (file, event) => {
    setFileName(event.target.files[0].name);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      /* Converts a worksheet object to an array of JSON objects*/
      const excelData = XLSX.utils.sheet_to_json(firstSheet, {
        blankrows: false,
      });
      // console.log('excelData', excelData);

      // map excelData to uploadedExcel where childCategoryId !== ''
      const emptyRowsRemovedData = [];
      excelData.map(
        (item) => item.childCategoryId !== '' && emptyRowsRemovedData.push(item)
      );
      // console.log('newData', emptyRowsRemovedData);
      setUploadedExcelData(emptyRowsRemovedData);
    };
  };

  const handleExcelTemplateDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await getProductBulkUploadTemplate();
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Bulk Upload Template.xlsx';
    link.click();

    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
  };

  const handleExcelDataUpload = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { data } = await bulkAddProducts(uploadedExcelData);

    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setUploadedExcelData([]);
      setFileName('');
    }
  };

  return (
    <div>
      <PageTitle2Btn
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
        title='Bulk add products through excel/csv'
        btn1Link='/product/new'
        btn1Text='Add single product'
        btn1Type='positive'
        btn2Link='/products'
        btn2Text='See all products'
        btn2Type='negative'
      />
      <div className='px-4 mt-[5.5rem] mb-10 space-y-4'>
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />

        {/* file upload area starts */}
        <h3 className='mb-4'>
          Add your products to your meraretail store in 3 steps:
        </h3>
        <ExcelUploader
          loading={loading}
          fileName={fileName}
          handleExcelTemplateDownload={handleExcelTemplateDownload}
          readExcel={readExcel}
          handleExcelDataUpload={handleExcelDataUpload}
        />
        {/* file uplaod area ended */}
        {/* uploaded data preview */}
        <h3 className='mb-4'>Preview excel data to be uploaded:</h3>
        <ExcelDataPreview uploadedExcelData={uploadedExcelData} />
        {/* preview section ends */}
      </div>
    </div>
  );
};

export default BulkAddProducts;
