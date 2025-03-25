"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const countries = [
  {
    name: "United States",
    process: [
      "Conduct a comprehensive trademark search",
      "File application with the USPTO",
      "Examination by a trademark examiner",
      "Publication for opposition",
      "Registration (if no opposition)",
    ],
    cost: "Between $225 and $400 per class",
    time: "7-10 months without opposition",
    uniqueFeatures: [
      "Dual filing system (use-based and intent-to-use)",
      "Declaration of use required between 5th and 6th year",
    ],
  },
  {
    name: "European Union",
    process: [
      "Optional search for prior trademarks",
      "File application with EUIPO",
      "Examination on absolute grounds",
      "Publication for opposition",
      "Registration (if no opposition)",
    ],
    cost: "€850 for the first class, €50 for the second class, €150 for each additional class",
    time: "4-6 months without opposition",
    uniqueFeatures: [
      "Single application covers all 27 member states",
      "No proof of use required for initial registration",
    ],
  },
  {
    name: "China",
    process: [
      "Conduct a thorough trademark search",
      "File application with CNIPA",
      "Formal and substantive examination",
      "Publication for opposition",
      "Registration (if no opposition)",
    ],
    cost: "Approximately $100 per class",
    time: "12-15 months without opposition",
    uniqueFeatures: ["Unique subclass system", "Importance of registering Chinese character versions"],
  },
  {
    name: "Japan",
    process: [
      "Conduct a comprehensive trademark search",
      "File application with JPO",
      "Substantive examination",
      "Publication for opposition",
      "Registration (if no opposition)",
    ],
    cost: "Approximately $250 per class",
    time: "6-8 months without opposition",
    uniqueFeatures: ["Accelerated examination system available", "Possibility of registering sound and motion marks"],
  },
  {
    name: "Brazil",
    process: [
      "Conduct a thorough trademark search",
      "File application with INPI",
      "Formal and substantive examination",
      "Publication for opposition",
      "Registration (if no opposition)",
    ],
    cost: "Approximately $150 per class",
    time: "18-24 months without opposition",
    uniqueFeatures: [
      "Legalized power of attorney required for foreign applicants",
      "Recently implemented multi-class system",
    ],
  },
]

export function TrademarkRegistrationComparison() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
        Trademark Registration Comparison by Country
      </h1>
      <p className="text-xl text-center mb-12 text-gray-600">
        Explore and compare trademark registration processes across major global markets
      </p>

      <Tabs defaultValue={selectedCountry} onValueChange={setSelectedCountry}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          {countries.map((country) => (
            <TabsTrigger key={country.name} value={country.name} className="text-sm md:text-base">
              {country.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {countries.map((country) => (
          <TabsContent key={country.name} value={country.name}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Trademark Registration in {country.name}</CardTitle>
                <CardDescription>Process, costs, and unique features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Registration Process</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {country.process.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Approximate Cost</h3>
                    <p>{country.cost}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Estimated Timeline</h3>
                    <p>{country.time}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Unique Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {country.uniqueFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          Key Factors in International Trademark Registration
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factor</TableHead>
              <TableHead>Importance</TableHead>
              <TableHead>Considerations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Territoriality</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Trademarks are generally protected only in countries where they are registered</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>High</TableCell>
              <TableCell>The date of first filing can be crucial for establishing rights in other countries</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Classification</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>
                Most countries use the Nice Classification system, but there may be local variations
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Use</TableCell>
              <TableCell>Varies</TableCell>
              <TableCell>Some countries require proof of use, others do not</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Language</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>Consider registering the mark in relevant local languages</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Ready to register your trademark internationally?</CardTitle>
          <CardDescription>
            Begin with our free trademark check to assess your brand's availability across multiple countries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/free-search">Start Free Check</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

