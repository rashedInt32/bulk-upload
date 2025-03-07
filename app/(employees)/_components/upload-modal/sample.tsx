import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SampleProps {
  title?: string;
  description?: string;
  fileName?: string;
}

export function Sample({
  title = "Table Example",
  description = "You can download the attached example and use them as a starting point for your own file.",
  fileName = "XLSX",
}: SampleProps) {
  return (
    <div className="w-full flex items-center justify-between mt-6 p-4 bg-grey-100 rounded-[12px] mb-2">
      <div className="flex items-center gap-3">
        <Image
          src="/excel-icon.svg"
          alt="Excel Icon"
          width={42}
          height={40}
          priority
        />
        <div className="flex flex-col">
          <h3 className="text-[14px] font-semibold mb-1">{title}</h3>
          <p className="text-[12px] text-grey-400 font-medium text-balance">
            {description}
          </p>
        </div>
      </div>
      <a
        href="/sample/mock_employee_data_v2.xlsx"
        download
        className="inline-flex items-center gap-2"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Image
            src="/download-icon.svg"
            alt="Download Icon"
            width={16}
            height={16}
            priority
          />
          Download {fileName}
        </Button>
      </a>
    </div>
  );
}
