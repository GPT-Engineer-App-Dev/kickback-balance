import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Expense', category: 'Nike' },
    { id: 2, date: '2023-10-05', amount: 150, type: 'Income', category: 'Adidas' },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', type: '', category: '' });
  const [editTransaction, setEditTransaction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    setNewTransaction({ date: '', amount: '', type: '', category: '' });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditTransaction(transaction);
  };

  const handleUpdateTransaction = () => {
    setTransactions(transactions.map((t) => (t.id === editTransaction.id ? editTransaction : t)));
    setEditTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <Input name="date" placeholder="Date" value={newTransaction.date} onChange={handleInputChange} />
            <Input name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleInputChange} />
            <Select name="type" value={newTransaction.type} onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Input name="category" placeholder="Category" value={newTransaction.category} onChange={handleInputChange} />
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleEditTransaction(transaction.id)}>Edit</Button>
                  <Button variant="outline" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editTransaction && (
        <Dialog open={true} onOpenChange={() => setEditTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <Input name="date" placeholder="Date" value={editTransaction.date} onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} />
              <Input name="amount" placeholder="Amount" value={editTransaction.amount} onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })} />
              <Select name="type" value={editTransaction.type} onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Input name="category" placeholder="Category" value={editTransaction.category} onChange={(e) => setEditTransaction({ ...editTransaction, category: e.target.value })} />
              <Button onClick={handleUpdateTransaction}>Update Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;