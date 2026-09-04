import os

file_path = r'src/pages/admin/Dashboard.css'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# keep up to line 1172 (index 1171)
new_lines = lines[:1172]

# append the new responsive rules
new_css = '''
/* =========================================
   Responsive Design for Admin Panel
========================================= */

/* Global responsive layout fixes */
.dashboard-main,
.dashboard-container,
.dashboard-content,
.dashboard-card,
.stat-card,
.premium-glass-card,
.middle-grid > div,
.stats-grid > div,
.bottom-grid > div,
.middle-grid,
.bottom-grid,
.stats-grid,
.product-management-page,
.list-view-container {
  min-width: 0 !important;
}

/* Ensure all tables are horizontally scrollable without breaking parent layout */
.hide-scrollbar, .ant-table-wrapper, .ant-table-container, .product-table-wrapper {
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
}

/* Recharts wrappers need relative positioning and no overflow */
.chart-wrapper, .donut-chart-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

/* TABLET LAYOUT (up to 1024px) */
@media (max-width: 1024px) {
  /* Sidebar Overlay & Off-canvas */
  .dashboard-sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .dashboard-sidebar.mobile-open {
    left: 0;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .sidebar-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  .dashboard-main {
    margin-left: 0 !important;
    width: 100%;
    padding: 16px 20px;
  }

  /* 2 Column Stats Grid for Tablet */
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 1 Column for other grids */
  .middle-grid {
    grid-template-columns: 1fr;
  }
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  /* Wrap Header Actions */
  .dashboard-header {
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
  }
  .header-left, .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  /* Modal responsive */
  .ant-modal {
    max-width: 95vw !important;
  }
}

/* MOBILE LAYOUT (up to 768px) */
@media (max-width: 768px) {
  /* 1 Column Stats Grid for Mobile */
  .stats-grid {
    grid-template-columns: 1fr;
  }

  /* Reduce Card Padding */
  .dashboard-card, .premium-glass-card, .stat-card {
    padding: 16px !important;
  }

  /* Hide Search on Mobile Header to save space */
  .header-right .search-bar {
    display: none; 
  }
  .header-right {
    justify-content: flex-end;
  }
}
'''

new_lines.append(new_css)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
