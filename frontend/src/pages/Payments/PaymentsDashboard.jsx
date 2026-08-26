import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import Table from '../../components/Table'

const PaymentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [payments, setPayments] = useState([
    { id: 'TXN001', purpose: 'Property Tax 2024', amount: 5000, status: 'pending', date: '2024-03-31', dueDate: '2024-03-31' },
    { id: 'TXN002', purpose: 'Water Bill', amount: 350, status: 'paid', date: '2024-02-15', dueDate: '2024-02-15' },
    { id: 'TXN003', purpose: 'Electricity Bill', amount: 1200, status: 'paid', date: '2024-02-10', dueDate: '2024-02-10' },
    { id: 'TXN004', purpose: 'Professional Tax', amount: 2000, status: 'pending', date: '2024-03-15', dueDate: '2024-03-15' },
    { id: 'TXN005', purpose: 'GST Payment', amount: 45000, status: 'paid', date: '2024-01-20', dueDate: '2024-01-20' },
    { id: 'TXN006', purpose: 'Passport Fee', amount: 1500, status: 'paid', date: '2024-01-10', dueDate: '2024-01-10' }
  ])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'history', label: 'Payment History', icon: '📜' },
    { id: 'receipts', label: 'Receipts', icon: '🧾' },
    { id: 'refunds', label: 'Refund Status', icon: '↩️' }
  ]

  const paymentColumns = [
    { 
      key: 'id', 
      header: 'Transaction ID',
      render: (value) => <span className="transaction-id">{value}</span>
    },
    { key: 'purpose', header: 'Purpose' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => <span className="amount">₹{value.toLocaleString()}</span>
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const statusColors = {
          'paid': 'table-badge-approved',
          'pending': 'table-badge-pending',
          'failed': 'table-badge-rejected',
          'refunded': 'table-badge-warning'
        }
        return <span className={`table-badge ${statusColors[value] || ''}`}>{value}</span>
      }
    },
    { key: 'date', header: 'Date' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="payment-actions">
          {row.status === 'pending' && (
            <Button size="small" className="pay-button">Pay Now</Button>
          )}
          {row.status === 'paid' && (
            <Button variant="outline" size="small" className="receipt-button">Receipt</Button>
          )}
        </div>
      )
    }
  ]

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const stats = {
    pending: totalPending,
    paid: totalPaid,
    receipts: payments.filter(p => p.status === 'paid').length,
    refunds: 0
  }

  const handlePayment = (id) => {
    console.log('Processing payment for:', id)
    // In real implementation, this would open payment gateway
  }

  const downloadReceipt = (id) => {
    console.log('Downloading receipt for:', id)
    // In real implementation, this would download PDF receipt
  }

  return (
    <div className="payments-page-layout">
      <Sidebar />
      <div className="payments-content">
        <div className="payments-header">
          <div>
            <h1 className="payments-title">Payments Dashboard</h1>
            <p className="payments-subtitle">Manage your government service payments</p>
          </div>
          <Button icon="➕">Make Payment</Button>
        </div>

        {/* Summary Cards */}
        <div className="payment-summary-cards">
          <Card className="summary-card pending-card" style={{ borderTop: '4px solid var(--warning-orange)' }}>
            <div className="summary-card-content">
              <div className="summary-icon-wrapper" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                <span className="summary-icon">⏳</span>
              </div>
              <div className="summary-info">
                <div className="summary-label">Pending Amount</div>
                <div className="summary-value" style={{ color: '#92400e' }}>₹{totalPending.toLocaleString()}</div>
                <Button size="small" className="pay-all-button">Pay All</Button>
              </div>
            </div>
          </Card>

          <Card className="summary-card paid-card" style={{ borderTop: '4px solid var(--success-green)' }}>
            <div className="summary-card-content">
              <div className="summary-icon-wrapper" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
                <span className="summary-icon">✅</span>
              </div>
              <div className="summary-info">
                <div className="summary-label">Total Paid</div>
                <div className="summary-value" style={{ color: '#065f46' }}>₹{totalPaid.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          <Card className="summary-card receipts-card" style={{ borderTop: '4px solid var(--primary-blue)' }}>
            <div className="summary-card-content">
              <div className="summary-icon-wrapper" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                <span className="summary-icon">🧾</span>
              </div>
              <div className="summary-info">
                <div className="summary-label">Receipts Available</div>
                <div className="summary-value" style={{ color: '#1e40af' }}>{stats.receipts}</div>
              </div>
            </div>
          </Card>

          <Card className="summary-card refunds-card" style={{ borderTop: '4px solid var(--gray-400)' }}>
            <div className="summary-card-content">
              <div className="summary-icon-wrapper" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
                <span className="summary-icon">↩️</span>
              </div>
              <div className="summary-info">
                <div className="summary-label">Refund Status</div>
                <div className="summary-value" style={{ color: '#374151' }}>{stats.refunds}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Tabs */}
        <div className="payment-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`payment-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="payment-tab-content">
          {activeTab === 'overview' && (
            <>
              {/* Pending Payments */}
              <div className="payments-section">
                <h2 className="section-title">Pending Payments</h2>
                <div className="pending-payments-list">
                  {payments.filter(p => p.status === 'pending').map((payment) => (
                    <Card key={payment.id} className="pending-payment-card">
                      <div className="pending-payment-content">
                        <div className="payment-info">
                          <h3 className="payment-purpose">{payment.purpose}</h3>
                          <p className="payment-due-date">Due: {payment.dueDate}</p>
                        </div>
                        <div className="payment-amount-section">
                          <div className="payment-amount">₹{payment.amount.toLocaleString()}</div>
                          <Button 
                            size="small" 
                            className="pay-button"
                            onClick={() => handlePayment(payment.id)}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="payments-section">
                <h2 className="section-title">Recent Transactions</h2>
                <Table 
                  columns={paymentColumns}
                  data={payments.slice(0, 5)}
                  className="payments-table"
                />
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <div className="payments-section">
              <h2 className="section-title">Complete Payment History</h2>
              <Table 
                columns={paymentColumns}
                data={payments}
                className="payments-table"
              />
            </div>
          )}

          {activeTab === 'receipts' && (
            <div className="payments-section">
              <h2 className="section-title">Available Receipts</h2>
              <div className="receipts-list">
                {payments.filter(p => p.status === 'paid').map((payment) => (
                  <Card key={payment.id} className="receipt-card">
                    <div className="receipt-content">
                      <div className="receipt-icon">🧾</div>
                      <div className="receipt-info">
                        <h3 className="receipt-purpose">{payment.purpose}</h3>
                        <p className="receipt-amount">₹{payment.amount.toLocaleString()}</p>
                        <p className="receipt-date">Paid on: {payment.date}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => downloadReceipt(payment.id)}
                      >
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="payments-section">
              <h2 className="section-title">Refund Status</h2>
              <Card className="empty-state">
                <div className="empty-icon">↩️</div>
                <h3>No refund requests</h3>
                <p>You don't have any pending or completed refunds.</p>
              </Card>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <Card title="Saved Payment Methods" className="payment-methods-card" icon="💳">
          <div className="payment-methods-list">
            <div className="payment-method-item">
              <span className="payment-method-icon">💳</span>
              <div className="payment-method-info">
                <span className="payment-method-name">HDFC Bank ••••• 4532</span>
                <span className="payment-method-expiry">Expires 12/25</span>
              </div>
              <span className="payment-method-badge primary">Primary</span>
            </div>
            <div className="payment-method-item">
              <span className="payment-method-icon">🏦</span>
              <div className="payment-method-info">
                <span className="payment-method-name">ICICI Bank ••••• 7891</span>
                <span className="payment-method-expiry">Expires 08/24</span>
              </div>
              <Button variant="ghost" size="small">Set Primary</Button>
            </div>
            <Button variant="outline" className="add-payment-method">+ Add Payment Method</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PaymentsDashboard
