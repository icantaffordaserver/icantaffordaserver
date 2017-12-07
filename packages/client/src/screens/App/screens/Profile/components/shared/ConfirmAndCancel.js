import React from 'react'
import { Button } from '../../../../styles'

const ConfirmAndCancel = ({
  handleSave,
  handleCancel,
  cancelText,
  loading,
  canSubmit,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        right
        small
        round
        loading={loading}
        disabled={canSubmit && !canSubmit()}
        onClick={handleSave}
      >
        Confirm
      </Button>

      <Button small left round altGray onClick={handleCancel}>
        {cancelText || 'Clear changes'}
      </Button>
    </div>
  )
}

export default ConfirmAndCancel
