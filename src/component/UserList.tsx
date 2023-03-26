import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination, Spin, Alert } from 'antd';
import { RootState } from '../redux/store';
import { getUserList, setCurrentPage } from '../redux/userSlice';


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text: string) => <img src={text} alt="avatar" width="50" />,
  },
];

const UserList = () => {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserList(currentPage));
  }, [dispatch, currentPage]);

  const handlePaginationChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(getUserList(page));
  };

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} loading={isLoading} />
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      )}
      {!isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination current={currentPage} total={totalPages * 6} onChange={handlePaginationChange} />
        </div>
      )}
    </>
  );
};

export default UserList;