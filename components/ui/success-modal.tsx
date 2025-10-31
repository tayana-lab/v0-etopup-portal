"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Phone, FileText, Download, Share2 } from "lucide-react"
import { jsPDF } from "jspdf"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  type: "package" | "bill" | "topup"
  data: any
  transactionId: string
}

export function SuccessModal({ isOpen, onClose, type, data, transactionId }: SuccessModalProps) {
  const getIcon = () => {
    switch (type) {
      case "package":
        return <Package className="h-6 w-6 text-blue-500" />
      case "bill":
        return <FileText className="h-6 w-6 text-green-500" />
      case "topup":
        return <Phone className="h-6 w-6 text-purple-500" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "package":
        return "Package Purchased Successfully!"
      case "bill":
        return "Bill Payment Successful!"
      case "topup":
        return "Prepaid Recharge Successful!"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "package":
        return "Your package has been activated and is ready to use."
      case "bill":
        return "Your bill payment has been processed successfully."
      case "topup":
        return "Your mobile account has been recharged successfully."
    }
  }

  const handleDownloadReceipt = async () => {
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, "0")
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const year = currentDate.getFullYear()
    const hours = String(currentDate.getHours()).padStart(2, "0")
    const minutes = String(currentDate.getMinutes()).padStart(2, "0")
    const seconds = String(currentDate.getSeconds()).padStart(2, "0")

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    const formattedDate = `${day}/${month}/${year}`

    const doc = new jsPDF()

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Cable & Wireless (Seychelles) Ltd", 20, 20)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    // Left column - Address
    doc.text("Francis Rachel Street", 20, 30)
    doc.text("P.O Box 4,", 20, 36)
    doc.text("Victoria", 20, 42)
    doc.text("Mahe", 20, 48)
    doc.text("Seychelles", 20, 54)

    // Right column - Contact details (aligned to right)
    doc.text("Tel        : (+248) 428 4000", 120, 30)
    doc.text("Fax       : (+248) 432 2555", 120, 36)
    doc.text("Website : www.cwseychelles.com", 120, 42)

    doc.setLineWidth(0.5)
    doc.line(20, 62, 190, 62)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("eShop Receipt", 105, 75, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    const serviceType = type === "bill" ? "Bill Payment" : type === "topup" ? "Prepaid Recharge" : "Package Purchase"

    let yPos = 90

    // Left column details
    doc.text("Date of purchase", 20, yPos)
    doc.text(`: ${formattedDateTime}`, 70, yPos)

    // Right column details
    doc.text("Receipt No", 120, yPos)
    doc.text(`: ${transactionId}`, 160, yPos)

    yPos += 8
    doc.text("eShop Customer", 20, yPos)
    doc.text(`: ${data?.customerName || "Customer"}`, 70, yPos)

    doc.text("Date", 120, yPos)
    doc.text(`: ${formattedDate}`, 160, yPos)

    yPos += 8
    doc.text("Service", 20, yPos)
    doc.text(`: ${serviceType}`, 70, yPos)

    yPos += 8
    doc.text("Account number", 20, yPos)
    doc.text(`: ${data?.accountNumber || data?.phoneNumber || "N/A"}`, 70, yPos)

    yPos += 8
    doc.text("Account name", 20, yPos)
    doc.text(`: ${data?.accountName || data?.customerName || "Customer"}`, 70, yPos)

    yPos += 8
    doc.text("Amount (SR)", 20, yPos)
    doc.text(`: ${data?.amount || data?.price || "0.00"}`, 70, yPos)

    yPos += 8
    doc.text("Payment Method", 20, yPos)
    doc.text(`: ${data?.paymentMethod || "Visa/MasterCard"}`, 70, yPos)

    yPos += 8
    doc.text("Payment Transaction ID", 20, yPos)
    doc.text(`: ${transactionId}`, 70, yPos)

    doc.save(`CWS-Receipt-${transactionId}.pdf`)
  }

  const handleShareReceipt = () => {
    const shareText = `Transaction Receipt\nID: ${transactionId}\nAmount: SR ${data?.amount || data?.price || "0.00"}\nStatus: Successful`

    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Receipt",
          text: shareText,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText)
          alert("Receipt details copied to clipboard!")
        })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Receipt details copied to clipboard!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="flex items-center justify-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Transaction ID:</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Date & Time:</span>
              <span className="text-sm">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Amount Paid:</span>
              <span className="font-semibold text-green-600">SR {data?.amount || data?.price || "0.00"}</span>
            </div>
          </div>

          {type === "package" && data && (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your {data.packageName || "package"} package is now active and will expire on{" "}
                <span className="font-semibold">
                  {data.validity
                    ? new Date(Date.now() + Number.parseInt(data.validity) * 24 * 60 * 60 * 1000).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
            </div>
          )}

          {type === "topup" && data && (
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                SR {data.amount || "0.00"} has been added to +248 {data.phoneNumber || "N/A"}
              </p>
            </div>
          )}

          {type === "bill" && data && (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                Your bill for {data.accountNumber || "N/A"} has been paid successfully.
              </p>
            </div>
          )}

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadReceipt} className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShareReceipt} className="flex-1 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Receipt
            </Button>
          </div>

          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
