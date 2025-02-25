import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaImage, FaLock, FaUnlock, FaSignature, FaEdit, FaFileAlt, FaSearch, FaSort, FaFileInvoice, FaEyeSlash, FaCog, FaPaste, FaSync, FaShieldAlt } from "react-icons/fa";
import { MdMergeType, MdOutlineFindReplace, MdOutlineCompare, MdOutlineRotateLeft } from "react-icons/md";
import { AiOutlineScan } from "react-icons/ai";

const tools = [
  { icon: <MdMergeType className="text-[#4caf4f] text-4xl" />, title: "Merge PDF", description: "Combine PDFs in the order you want with the easiest PDF merger available." },
  { icon: <FaFilePdf className="text-[#4caf4f] text-4xl" />, title: "Split PDF", description: "Separate one page or a whole set for easy conversion into independent PDF files." },
  { icon: <FaFileAlt className="text-[#4caf4f] text-4xl" />, title: "Compress PDF", description: "Reduce file size while optimizing for maximal PDF quality." },
  { icon: <FaFileWord className="text-[#4caf4f] text-4xl" />, title: "PDF to Word", description: "Convert PDFs to easy-to-edit DOC and DOCX documents with high accuracy." },
  { icon: <FaFilePowerpoint className="text-[#4caf4f] text-4xl" />, title: "PDF to PowerPoint", description: "Turn your PDFs into PPT and PPTX slideshows effortlessly." },
  { icon: <FaFileExcel className="text-[#4caf4f] text-4xl" />, title: "PDF to Excel", description: "Extract data from PDFs into Excel spreadsheets in seconds." },
  { icon: <FaFileWord className="text-[#4caf4f] text-4xl" />, title: "Word to PDF", description: "Convert DOC and DOCX files to PDF for easier reading." },
  { icon: <FaFilePowerpoint className="text-[#4caf4f] text-4xl" />, title: "PowerPoint to PDF", description: "Convert PPT and PPTX slideshows to PDF for easy viewing." },
  { icon: <FaFileExcel className="text-[#4caf4f] text-4xl" />, title: "Excel to PDF", description: "Convert EXCEL spreadsheets to PDF for better readability." },
  { icon: <FaEdit className="text-[#4caf4f] text-4xl" />, title: "Edit PDF", description: "Add text, images, shapes, or freehand annotations to PDFs." },
  { icon: <FaImage className="text-[#4caf4f] text-4xl" />, title: "PDF to JPG", description: "Convert each PDF page into JPG or extract images from PDFs." },
  { icon: <FaImage className="text-[#4caf4f] text-4xl" />, title: "JPG to PDF", description: "Convert JPG images to PDF quickly with adjustable orientation." },
  { icon: <FaSignature className="text-[#4caf4f] text-4xl" />, title: "Sign PDF", description: "Digitally sign PDFs or request electronic signatures." },
  { icon: <FaPaste className="text-[#4caf4f] text-4xl" />, title: "Watermark", description: "Add an image or text watermark to your PDFs easily." },
  { icon: <MdOutlineRotateLeft className="text-[#4caf4f] text-4xl" />, title: "Rotate PDF", description: "Rotate your PDFs the way you need, even in bulk." },
  { icon: <FaFileInvoice className="text-[#4caf4f] text-4xl" />, title: "HTML to PDF", description: "Convert webpages into PDFs by pasting the URL." },
  { icon: <FaUnlock className="text-[#4caf4f] text-4xl" />, title: "Unlock PDF", description: "Remove password protection from PDFs easily." },
  { icon: <FaLock className="text-[#4caf4f] text-4xl" />, title: "Protect PDF", description: "Encrypt PDFs with a password for security." },
  { icon: <FaSort className="text-[#4caf4f] text-4xl" />, title: "Organize PDF", description: "Sort, delete, or add pages to your PDFs as needed." },
  { icon: <FaShieldAlt className="text-[#4caf4f] text-4xl" />, title: "PDF to PDF/A", description: "Convert PDFs to PDF/A for long-term archiving." },
  { icon: <MdOutlineFindReplace className="text-[#4caf4f] text-4xl" />, title: "Repair PDF", description: "Fix corrupted PDF files and recover data." },
  { icon: <FaFileInvoice className="text-[#4caf4f] text-4xl" />, title: "Page numbers", description: "Add page numbers to PDFs easily." },
  { icon: <AiOutlineScan className="text-[#4caf4f] text-4xl" />, title: "Scan to PDF", description: "Capture scans from your device and save them as PDFs." },
  { icon: <FaSearch className="text-[#4caf4f] text-4xl" />, title: "OCR PDF", description: "Convert scanned PDFs into searchable documents." },
  { icon: <MdOutlineCompare className="text-[#4caf4f] text-4xl" />, title: "Compare PDF", description: "Spot differences between different versions of PDFs." },
  { icon: <FaEyeSlash className="text-[#4caf4f] text-4xl" />, title: "Redact PDF", description: "Permanently remove sensitive text and graphics from PDFs." },
];
export default function Tools() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mx-3 md:mx-10 lg:mx-18">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Every tool you need to work with PDFs in one place
        </h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock, and watermark PDFs with just a few clicks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tools.map((tool, index) => (
            <a 
              key={index} 
              href={`/tools/${tool.title.toLowerCase().replace(/\s+/g, "-")}`} 
              className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-200 block cursor-pointer"
            >
              <div className="flex justify-center mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold">{tool.title}</h3>
              <p className="text-gray-500 mt-2">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

