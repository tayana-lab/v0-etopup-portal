"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Phone, FileText, Download, Share2 } from "lucide-react"

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

  const handleDownloadReceipt = () => {
    const receiptContent = `
═══════════════════════════════════════
           TRANSACTION RECEIPT
═══════════════════════════════════════

Transaction ID: ${transactionId}
Date & Time: ${new Date().toLocaleString()}
Type: ${type.toUpperCase()}

───────────────────────────────────────
TRANSACTION DETAILS
───────────────────────────────────────

${type === "package" ? `Package: ${data?.packageName || "N/A"}` : ""}
${type === "topup" ? `Mobile Number: +248 ${data?.phoneNumber || "N/A"}` : ""}
${type === "bill" ? `Account Number: ${data?.accountNumber || "N/A"}` : ""}
${type === "bill" ? `Bill Type: ${data?.billType || "N/A"}` : ""}

Amount Paid: SCR ${data?.amount || data?.price || "0.00"}

${type === "package" && data?.validity ? `Validity: ${data.validity} days` : ""}
${type === "package" && data?.validity ? `Expires: ${new Date(Date.now() + Number.parseInt(data.validity) * 24 * 60 * 60 * 1000).toLocaleDateString()}` : ""}

───────────────────────────────────────
STATUS: SUCCESSFUL
───────────────────────────────────────

Thank you for your business!

═══════════════════════════════════════
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${transactionId}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShareReceipt = () => {
    const shareText = `Transaction Receipt\nID: ${transactionId}\nAmount: SCR ${data?.amount || data?.price || "0.00"}\nStatus: Successful`

    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Receipt",
          text: shareText,
        })
        .catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(shareText)
          alert("Receipt details copied to clipboard!")
        })
    } else {
      // Fallback: copy to clipboard
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
              <span className="font-semibold text-green-600">SCR {data?.amount || data?.price || "0.00"}</span>
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
                SCR {data.amount || "0.00"} has been added to +248 {data.phoneNumber || "N/A"}
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
