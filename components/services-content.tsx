import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileCheck, RefreshCw, Search, Globe, Shield } from "lucide-react"
import Link from "next/link"

export function ServicesContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <Briefcase className="h-6 w-6 mr-2" />
            Business Consulting
          </CardTitle>
          <Link href="/services/business-consulting" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>
          We help businesses of all sizes achieve their goals through strategic planning, process improvement, and
          operational excellence.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <FileCheck className="h-6 w-6 mr-2" />
            Compliance &amp; Risk Management
          </CardTitle>
          <Link href="/services/compliance-risk-management" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>
          We help businesses mitigate risk and ensure compliance with relevant regulations and standards.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <RefreshCw className="h-6 w-6 mr-2" />
            Digital Transformation
          </CardTitle>
          <Link href="/services/digital-transformation" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>
          We help businesses leverage technology to improve efficiency, productivity, and customer experience.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <Search className="h-6 w-6 mr-2" />
            Market Research &amp; Analysis
          </CardTitle>
          <Link href="/services/market-research-analysis" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>
          We help businesses understand their target market, identify opportunities, and make data-driven decisions.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <Globe className="h-6 w-6 mr-2" />
            Global Expansion
          </CardTitle>
          <Link href="/services/global-expansion" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>We help businesses expand their operations into new markets and regions.</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            <Shield className="h-6 w-6 mr-2" />
            Cybersecurity
          </CardTitle>
          <Link href="/services/cybersecurity" className="text-muted-foreground">
            Learn More
          </Link>
        </CardHeader>
        <CardContent>We help businesses protect their data and systems from cyber threats.</CardContent>
      </Card>
    </div>
  )
}
