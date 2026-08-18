import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle2, XCircle, ArrowDownToLine, MoreVertical } from 'lucide-react';
import { Dropdown } from 'antd';

const mockActivities = [
  { id: 1, date: 'Aug 17, 10:30 AM', activity: 'Updated', module: 'Product', description: 'Updated product price for Linen Shirt', user: 'Admin User', status: 'Success' },
  { id: 2, date: 'Aug 17, 10:15 AM', activity: 'Created', module: 'Coupon', description: 'Created new coupon SUMMER50', user: 'Admin User', status: 'Success' },
  { id: 3, date: 'Aug 17, 09:45 AM', activity: 'Deleted', module: 'Category', description: 'Deleted category "Winter Sale"', user: 'Admin User', status: 'Success' },
  { id: 4, date: 'Aug 16, 11:20 PM', activity: 'Login', module: 'Auth', description: 'Logged in from Chrome / Windows', user: 'Admin User', status: 'Success' },
  { id: 5, date: 'Aug 16, 11:15 PM', activity: 'Login', module: 'Auth', description: 'Failed login attempt (Invalid Password)', user: 'Unknown', status: 'Failed' },
  { id: 6, date: 'Aug 16, 04:30 PM', activity: 'Export', module: 'Orders', description: 'Exported Order Report (CSV)', user: 'Super Admin', status: 'Success' },
];

const ActivityLogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLogs = mockActivities.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) || log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' ? true : log.activity === typeFilter;
    const matchesStatus = statusFilter === 'All' ? true : log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === 'Success' ? '#10b981' : '#ef4444';
  };

  const getActivityColor = (activity) => {
    switch(activity) {
      case 'Created': return { bg: '#ecfdf5', text: '#10b981' };
      case 'Updated': return { bg: '#eff6ff', text: '#3b82f6' };
      case 'Deleted': return { bg: '#fef2f2', text: '#ef4444' };
      case 'Login': return { bg: '#f5f3ff', text: '#8b5cf6' };
      case 'Export': return { bg: '#fffbeb', text: '#f59e0b' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  return (
    <div style={{ padding: '0 8px 32px 8px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#111827', letterSpacing: '-0.5px' }}>Activity Log</h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Track all admin actions and system events.</p>
        </div>
        <button style={{ 
          background: '#fff', color: '#374151', border: '1px solid #e5e7eb', 
          padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', 
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <ArrowDownToLine size={16} />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', gap: '16px', marginBottom: '24px', background: '#fff', 
        padding: '20px', borderRadius: '16px', border: '1px solid #f3f4f6',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)', flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search activity, module, or user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
              border: '1px solid #e5e7eb', fontSize: '14px', color: '#111827',
              outline: 'none', transition: 'all 0.2s'
            }} 
          />
        </div>
        
        <select 
          value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: '0 16px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none' }}
        >
          <option value="All">All Activities</option>
          <option value="Login">Login</option>
          <option value="Created">Created</option>
          <option value="Updated">Updated</option>
          <option value="Deleted">Deleted</option>
          <option value="Export">Export</option>
        </select>

        <select 
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0 16px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none' }}
        >
          <option value="All">All Status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
        
        <button style={{ 
          background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb', 
          padding: '0 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '500', 
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
        }}>
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Module</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ padding: '16px 24px', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => {
              const actColor = getActivityColor(log.activity);
              return (
                <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>
                      <Clock size={14} color="#9ca3af" />
                      {log.date}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      background: actColor.bg, color: actColor.text, 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
                    }}>
                      {log.activity}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ color: '#111827', fontSize: '14px', fontWeight: '500' }}>{log.module}</span>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>by {log.user}</div>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#4b5563', fontSize: '14px', maxWidth: '300px' }}>
                    {log.description}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: getStatusColor(log.status), fontSize: '14px', fontWeight: '600' }}>
                      {log.status === 'Success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      {log.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Dropdown trigger={['click']} menu={{ items: [{ key: 'details', label: 'View Details' }] }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px' }}>
                        <MoreVertical size={16} />
                      </button>
                    </Dropdown>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            No activity logs match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogManagement;
